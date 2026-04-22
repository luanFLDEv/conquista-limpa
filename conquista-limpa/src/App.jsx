import Header from './components/Header'
import Footer from './components/Footer'
import DenunciaModal from './components/DenunciaModal'
import { PINS, PIN_CONFIG } from './data/pins'
import { useState, useEffect, useRef } from 'react'
import FilterPanel from './components/FilterPanel'
import PinPopup from './components/PinPopup'
import StarBar from './components/StarBar'
import Fab from './components/Fab'
export default function ConquistaLimpa() {
	const mapRef = useRef(null)
	const leafletMap = useRef(null)
	const markersRef = useRef([])
	const [mapReady, setMapReady] = useState(false)
	const [selectedPin, setSelectedPin] = useState(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [filterActive, setFilterActive] = useState({
		recycle: true,
		descarte: true,
		esgoto: true,
		denuncia: true
	})

	useEffect(() => {
		if (mapReady || leafletMap.current) return

		const linkCSS = document.createElement('link')
		linkCSS.rel = 'stylesheet'
		linkCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
		document.head.appendChild(linkCSS)

		const script = document.createElement('script')
		script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
		script.onload = () => {
			const L = window.L
			const map = L.map(mapRef.current, {
				center: [-14.865, -40.844],
				zoom: 14,
				zoomControl: false
			})

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				maxZoom: 19
			}).addTo(map)

			L.control.zoom({ position: 'bottomright' }).addTo(map)

			leafletMap.current = map
			setMapReady(true)
		}
		document.head.appendChild(script)
	}, [])

	useEffect(() => {
		if (!mapReady || !leafletMap.current) return
		const L = window.L
		const map = leafletMap.current

		markersRef.current.forEach(m => map.removeLayer(m))
		markersRef.current = []

		PINS.forEach(pin => {
			if (!filterActive[pin.type]) return
			const cfg = PIN_CONFIG[pin.type]

			const iconHtml = `
				<div style="
					width:36px;height:36px;
					background:${cfg.color};
					border-radius:50% 50% 50% 0;
					transform:rotate(-45deg);
					border:3px solid white;
					box-shadow:0 2px 8px rgba(0,0,0,0.25);
					display:flex;align-items:center;justify-content:center;
					cursor:pointer;
				">
					<span style="transform:rotate(45deg);font-size:14px;">${cfg.emoji}</span>
				</div>`

			const icon = L.divIcon({
				html: iconHtml,
				className: '',
				iconSize: [36, 36],
				iconAnchor: [18, 36]
			})
			const marker = L.marker([pin.lat, pin.lng], { icon })
			marker.on('click', () => setSelectedPin(pin))
			marker.addTo(map)
			markersRef.current.push(marker)
		})
	}, [mapReady, filterActive])

	const toggleFilter = type => {
		setFilterActive(prev => ({ ...prev, [type]: !prev[type] }))
	}

	const counts = Object.fromEntries(
		Object.keys(PIN_CONFIG).map(type => [
			type,
			PINS.filter(p => p.type === type).length
		])
	)

	return (
		<div
			style={{
				fontFamily: "'Syne', sans-serif",
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				background: '#0f1a0f',
				color: '#e8f5e8'
			}}
		>
			<link
				href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
				rel="stylesheet"
			/>

			{/* HEADER */}
			<Header onDenunciaClick={() => setModalOpen(true)} />

			{/* MAP AREA */}
			<div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
				{/* Leaflet map */}
				<div
					ref={mapRef}
					style={{ width: '100%', height: '100%', zIndex: 1 }}
				/>

				{!mapReady && (
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background: '#0f1a0f',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 12
						}}
					>
						<div style={{ fontSize: 32 }}>🌿</div>
						<div style={{ color: '#22c55e', fontWeight: 600, fontSize: 14 }}>
							Carregando mapa...
						</div>
					</div>
				)}

				{/* FILTROS */}
				<FilterPanel
					filterActive={filterActive}
					toggleFilter={toggleFilter}
					counts={counts}
				/>

				{/* POPUP de pin selecionado */}
				{selectedPin && (
					<PinPopup
						selectedPin={selectedPin}
						onClose={() => setSelectedPin(null)}
					/>
				)}

				{/* STATS BAR */}
				<StarBar counts={counts} />
				{/* FAB botão denúncia */}
				<Fab onClick={() => setModalOpen(true)} />
			</div>

			{/* FOOTER */}
			<Footer />

			{/* MODAL DENÚNCIA */}
			{modalOpen && <DenunciaModal onClose={() => setModalOpen(false)} />}
		</div>
	)
}
