import Header from './components/Header'
import Footer from './components/Footer'
import DenunciaModal from './components/DenunciaModal'
import { PINS, PIN_CONFIG } from './data/pins'
import { useState, useEffect, useRef } from 'react'
import FilterPanel from './components/FilterPanel'
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
			<Header onDenunciaClick={setModalOpen} />

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
					<div
						style={{
							position: 'absolute',
							bottom: 100,
							left: '50%',
							transform: 'translateX(-50%)',
							zIndex: 50,
							background: 'rgba(10,20,10,0.96)',
							backdropFilter: 'blur(16px)',
							border: `1px solid ${PIN_CONFIG[selectedPin.type].color}44`,
							borderRadius: 14,
							padding: '14px 18px',
							minWidth: 260,
							maxWidth: 320,
							boxShadow: `0 4px 24px ${PIN_CONFIG[selectedPin.type].color}22`
						}}
					>
						<button
							onClick={() => setSelectedPin(null)}
							style={{
								position: 'absolute',
								top: 8,
								right: 10,
								background: 'none',
								border: 'none',
								color: 'rgba(134,239,172,0.5)',
								fontSize: 18,
								cursor: 'pointer',
								lineHeight: 1
							}}
						>
							×
						</button>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								marginBottom: 8
							}}
						>
							{selectedPin.image && (
								<img
									src={selectedPin.image}
									alt={selectedPin.title}
									style={{
										width: '100%',
										height: 140,
										objectFit: 'cover',
										borderRadius: 10,
										marginBottom: 10
									}}
								/>
							)}

							<div>
								<div
									style={{ fontSize: 14, fontWeight: 700, color: '#f0fdf4' }}
								>
									{selectedPin.title}
								</div>

								<span
									style={{
										fontSize: 10,
										padding: '2px 8px',
										borderRadius: 99,
										fontFamily: "'DM Sans', sans-serif",
										background: PIN_CONFIG[selectedPin.type].bg,
										color: PIN_CONFIG[selectedPin.type].text
									}}
								>
									{PIN_CONFIG[selectedPin.type].label}
								</span>
							</div>
						</div>
						<p
							style={{
								fontSize: 12,
								color: 'rgba(134,239,172,0.75)',
								fontFamily: "'DM Sans', sans-serif",
								lineHeight: 1.6,
								margin: '0 0 10px'
							}}
						>
							{selectedPin.desc}
						</p>
					</div>
				)}

				{/* STATS BAR */}
				<div
					style={{
						position: 'absolute',
						bottom: 16,
						left: '50%',
						transform: 'translateX(-50%)',
						zIndex: 50,
						background: 'rgba(10,20,10,0.92)',
						backdropFilter: 'blur(12px)',
						border: '1px solid rgba(34,197,94,0.15)',
						borderRadius: 99,
						padding: '8px 20px',
						display: 'flex',
						gap: 0,
						whiteSpace: 'nowrap'
					}}
				>
					{Object.entries(PIN_CONFIG).map(([type, cfg], i) => (
						<div
							key={type}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 6,
								padding: '0 16px',
								borderRight: i < 3 ? '1px solid rgba(34,197,94,0.15)' : 'none'
							}}
						>
							<div
								style={{
									width: 8,
									height: 8,
									borderRadius: '50%',
									background: cfg.color
								}}
							/>
							<span
								style={{
									fontSize: 12,
									color: '#e8f5e8',
									fontFamily: "'DM Sans', sans-serif"
								}}
							>
								<strong style={{ color: cfg.color }}>{counts[type]}</strong>{' '}
								{cfg.label}
							</span>
						</div>
					))}
				</div>

				{/* FAB botão denúncia */}
				<button
					onClick={() => setModalOpen(true)}
					style={{
						position: 'absolute',
						bottom: 76,
						right: 16,
						zIndex: 50,
						width: 52,
						height: 52,
						borderRadius: '50%',
						background: 'linear-gradient(135deg,#22c55e,#16a34a)',
						border: 'none',
						fontSize: 22,
						cursor: 'pointer',
						boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transition: 'transform 0.2s, box-shadow 0.2s'
					}}
					onMouseEnter={e => {
						e.currentTarget.style.transform = 'scale(1.1)'
						e.currentTarget.style.boxShadow = '0 6px 28px rgba(34,197,94,0.6)'
					}}
					onMouseLeave={e => {
						e.currentTarget.style.transform = 'scale(1)'
						e.currentTarget.style.boxShadow = '0 4px 20px rgba(34,197,94,0.4)'
					}}
					title="Fazer denúncia"
				>
					📢
				</button>
			</div>

			{/* FOOTER */}
			<Footer />

			{/* MODAL DENÚNCIA */}
			{modalOpen && <DenunciaModal onClose={() => setModalOpen(false)} />}
		</div>
	)
}
