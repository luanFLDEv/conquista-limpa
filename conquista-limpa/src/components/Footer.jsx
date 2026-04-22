export default function Footer() {
	return (
		<footer
			style={{
				background: 'rgba(5,10,5,0.98)',
				borderTop: '1px solid rgba(34,197,94,0.15)',
				padding: '16px',
				display: 'flex',
				flexDirection: window.innerWidth < 768 ? 'column' : 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 12,
				textAlign: 'center',
				flexShrink: 0,
				zIndex: 100
			}}
		>
			{/* Parte esquerda */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					justifyContent: 'center',
					flexWrap: 'wrap'
				}}
			>
				<span style={{ fontSize: 14 }}>🌿</span>
				<span
					style={{
						fontSize: 12,
						color: 'rgba(134,239,172,0.6)',
						fontFamily: "'DM Sans', sans-serif"
					}}
				>
					© 2025 Conquista Limpa — Vitória da Conquista, BA
				</span>
			</div>

			{/* Links */}
			<div
				style={{
					display: 'flex',
					flexDirection: window.innerWidth < 768 ? 'column' : 'row',
					gap: 10,
					alignItems: 'center'
				}}
			>
				{['Sobre o projeto', 'Fale conosco', 'Prefeitura de VDC'].map(item => (
					<button
						key={item}
						style={{
							background: 'none',
							border: 'none',
							color: 'rgba(134,239,172,0.5)',
							fontFamily: "'DM Sans', sans-serif",
							fontSize: 12,
							cursor: 'pointer',
							transition: 'color 0.2s'
						}}
						onMouseEnter={e => (e.target.style.color = '#22c55e')}
						onMouseLeave={e => (e.target.style.color = 'rgba(134,239,172,0.5)')}
					>
						{item}
					</button>
				))}
			</div>
		</footer>
	)
}
