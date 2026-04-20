import { PIN_CONFIG } from '../data/pins'
export default function PinPopup({ selectedPin, onClose }) {
	return (
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
				onClick={() => onClose(null)}
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
					<div style={{ fontSize: 14, fontWeight: 700, color: '#f0fdf4' }}>
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
	)
}
