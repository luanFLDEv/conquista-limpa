import { useState, useEffect } from 'react'

export default function Header({ onDenunciaClick }) {
	const styles = {
		header: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '0 16px',
			height: 60,
			background: 'rgba(10,20,10,0.95)',
			borderBottom: '1px solid rgba(34,197,94,0.2)',
			position: 'relative',
			zIndex: 100
		},

		logoContainer: {
			display: 'flex',
			alignItems: 'center',
			gap: 10
		},

		logoIcon: {
			width: 32,
			height: 32,
			borderRadius: 8,
			background: 'linear-gradient(135deg,#22c55e,#16a34a)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: 18
		},

		logoText: {
			fontSize: 16,
			fontWeight: 800,
			color: '#f0fdf4'
		},

		logoSub: {
			fontSize: 10,
			color: 'rgba(134,239,172,0.7)'
		},

		nav: {
			display: 'flex',
			alignItems: 'center',
			gap: 8
		},

		navButton: {
			background: 'none',
			border: 'none',
			color: 'rgba(134,239,172,0.8)',
			cursor: 'pointer'
		},

		cta: {
			background: '#22c55e',
			border: 'none',
			padding: '8px 16px',
			borderRadius: 8,
			cursor: 'pointer'
		},

		menuButton: {
			background: 'none',
			border: 'none',
			fontSize: 22,
			color: '#22c55e',
			cursor: 'pointer'
		},

		mobileMenu: {
			position: 'absolute',
			top: 60,
			right: 10,
			background: '#0f1a0f',
			border: '1px solid rgba(34,197,94,0.2)',
			borderRadius: 10,
			padding: 12,
			display: 'flex',
			flexDirection: 'column',
			gap: 8,
			minWidth: 180
		},

		mobileItem: {
			background: 'none',
			border: 'none',
			color: '#e8f5e8',
			textAlign: 'left',
			padding: '6px 8px',
			cursor: 'pointer'
		},

		mobileCTA: {
			background: '#22c55e',
			border: 'none',
			padding: '8px',
			borderRadius: 6,
			cursor: 'pointer'
		}
	}
	const [menuOpen, setMenuOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<header style={styles.header}>
			{/* LOGO */}
			<div style={styles.logoContainer}>
				<div style={styles.logoIcon}>🌿</div>
				<div>
					<div style={styles.logoText}>
						Conquista <span style={{ color: '#22c55e' }}>Limpa</span>
					</div>
					<div style={styles.logoSub}>VITÓRIA DA CONQUISTA</div>
				</div>
			</div>

			{/* DESKTOP NAV */}
			{!isMobile && (
				<nav style={styles.nav}>
					{['Início', 'Como funciona', 'Parceiros'].map(item => (
						<button key={item} style={styles.navButton}>
							{item}
						</button>
					))}

					<button onClick={() => onDenunciaClick(true)} style={styles.cta}>
						📢 Fazer denúncia
					</button>
				</nav>
			)}

			{/* MOBILE MENU BUTTON */}
			{isMobile && (
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					style={styles.menuButton}
				>
					☰
				</button>
			)}

			{/* MOBILE DROPDOWN */}
			{isMobile && menuOpen && (
				<div style={styles.mobileMenu}>
					{['Início', 'Como funciona', 'Parceiros'].map(item => (
						<button key={item} style={styles.mobileItem}>
							{item}
						</button>
					))}

					<button
						onClick={() => {
							onDenunciaClick(true)
							setMenuOpen(false)
						}}
						style={styles.mobileCTA}
					>
						📢 Fazer denúncia
					</button>
				</div>
			)}
		</header>
	)
}
