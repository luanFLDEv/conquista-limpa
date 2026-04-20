import { PIN_CONFIG } from '../data/pins'
export default function StarBar({ counts }) {
	return (
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
	)
}
