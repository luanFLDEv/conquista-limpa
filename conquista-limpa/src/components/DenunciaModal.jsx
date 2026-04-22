import { WHATSAPP_NUMBER } from '../data/pins'
export default function DenunciaModal({ onClose }) {
	const openWhatsApp = () => {
		const msg = encodeURIComponent(
			'Olá! Quero fazer uma denúncia ao Conquista Limpa 🌿'
		)
		window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
	}
	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 200,
				background: 'rgba(0,0,0,0.7)',
				backdropFilter: 'blur(6px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 16
			}}
			onClick={e => {
				if (e.target === e.currentTarget) onClose(false)
			}}
		>
			<div
				style={{
					background: '#0f1a0f',
					borderRadius: 18,
					border: '1px solid rgba(34,197,94,0.25)',
					padding: '28px 28px 24px',
					width: '100%',
					maxWidth: 400,
					boxShadow: '0 8px 40px rgba(0,0,0,0.6)'
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 20
					}}
				>
					<div>
						<div
							style={{
								fontSize: 18,
								fontWeight: 800,
								color: '#f0fdf4',
								letterSpacing: '-0.02em'
							}}
						>
							Fazer denúncia
						</div>
						<div
							style={{
								fontSize: 12,
								color: 'rgba(134,239,172,0.6)',
								fontFamily: "'DM Sans', sans-serif",
								marginTop: 2
							}}
						>
							via WhatsApp · triagem em até 24h
						</div>
						<div className="animate-pulse">
							<p>Testando</p>
						</div>
					</div>
					<button
						onClick={() => onClose(false)}
						style={{
							background: 'rgba(34,197,94,0.1)',
							border: '1px solid rgba(34,197,94,0.2)',
							color: '#86efac',
							borderRadius: 8,
							width: 32,
							height: 32,
							fontSize: 16,
							cursor: 'pointer'
						}}
					>
						×
					</button>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 14,
						marginBottom: 20
					}}
				>
					{[
						{
							emoji: '♻️',
							type: 'recycle',
							label: 'Sugerir ponto de reciclagem'
						},
						{
							emoji: '🗑️',
							type: 'descarte',
							label: 'Informar local de descarte'
						},
						{ emoji: '⚠️', type: 'esgoto', label: 'Esgoto a céu aberto' },
						{
							emoji: '📍',
							type: 'denuncia',
							label: 'Lixo ou descarte irregular'
						}
					].map(opt => (
						<button
							key={opt.type}
							onClick={openWhatsApp}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 14,
								background: 'rgba(34,197,94,0.05)',
								border: '1px solid rgba(34,197,94,0.15)',
								borderRadius: 12,
								padding: '12px 16px',
								cursor: 'pointer',
								textAlign: 'left',
								transition: 'all 0.2s'
							}}
							onMouseEnter={e => {
								e.currentTarget.style.background = 'rgba(34,197,94,0.12)'
								e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)'
							}}
							onMouseLeave={e => {
								e.currentTarget.style.background = 'rgba(34,197,94,0.05)'
								e.currentTarget.style.borderColor = 'rgba(34,197,94,0.15)'
							}}
						>
							<span style={{ fontSize: 22, width: 32, textAlign: 'center' }}>
								{opt.emoji}
							</span>
							<span
								style={{
									fontSize: 13,
									color: '#e8f5e8',
									fontFamily: "'DM Sans', sans-serif",
									fontWeight: 500
								}}
							>
								{opt.label}
							</span>
							<span
								style={{
									marginLeft: 'auto',
									fontSize: 12,
									color: 'rgba(134,239,172,0.5)'
								}}
							>
								→
							</span>
						</button>
					))}
				</div>

				<div
					style={{
						background: 'rgba(37,99,235,0.1)',
						border: '1px solid rgba(37,99,235,0.2)',
						borderRadius: 10,
						padding: '10px 14px',
						display: 'flex',
						alignItems: 'center',
						gap: 10
					}}
				>
					<span style={{ fontSize: 20 }}>💬</span>
					<div>
						<div
							style={{
								fontSize: 12,
								fontWeight: 600,
								color: '#93c5fd',
								fontFamily: "'DM Sans', sans-serif"
							}}
						>
							Você será redirecionado ao WhatsApp
						</div>
						<div
							style={{
								fontSize: 11,
								color: 'rgba(147,197,253,0.7)',
								fontFamily: "'DM Sans', sans-serif",
								marginTop: 2
							}}
						>
							Nossa equipe responde e adiciona ao mapa após triagem.
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
