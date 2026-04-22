import { PIN_CONFIG } from '../data/pins'
export default function StarBar({ counts }) {
	return (
		<div className="flex absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#0a140aeb] backdrop-blur-md border border-[#22c55e26] rounded-full px-5 py-2  gap-0 whitespace-nowrap">
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
