import { PIN_CONFIG } from '../data/pins'
export default function FilterPanel({ filterActive, toggleFilter, counts }) {
	return (
		<div
			style={{
				position: 'absolute',
				top: 16,
				left: 16,
				zIndex: 50,
				background: 'rgba(10,20,10,0.92)',
				backdropFilter: 'blur(12px)',
				border: '1px solid rgba(34,197,94,0.2)',
				borderRadius: 12,
				padding: '12px 14px',
				display: 'flex',
				flexDirection: 'column',
				gap: 8,
				minWidth: 170
			}}
		>
			<div
				style={{
					fontSize: 10,
					fontWeight: 700,
					color: 'rgba(134,239,172,0.6)',
					letterSpacing: '0.12em',
					marginBottom: 2
				}}
			>
				FILTRAR PONTOS
			</div>
			{Object.entries(PIN_CONFIG).map(([type, cfg]) => (
				<button
					key={type}
					onClick={() => toggleFilter(type)}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 9,
						background: filterActive[type]
							? 'rgba(34,197,94,0.08)'
							: 'transparent',
						border: `1px solid ${filterActive[type] ? 'rgba(34,197,94,0.3)' : 'transparent'}`,
						borderRadius: 8,
						padding: '6px 10px',
						cursor: 'pointer',
						opacity: filterActive[type] ? 1 : 0.4,
						transition: 'all 0.2s'
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50% 50% 50% 0',
							transform: 'rotate(-45deg)',
							background: cfg.color,
							flexShrink: 0
						}}
					/>
					<span
						style={{
							fontSize: 12,
							color: '#e8f5e8',
							fontFamily: "'DM Sans', sans-serif",
							flex: 1,
							textAlign: 'left'
						}}
					>
						{cfg.label}
					</span>
					<span
						style={{
							fontSize: 11,
							fontWeight: 600,
							color: cfg.color,
							background: `${cfg.color}22`,
							borderRadius: 99,
							padding: '1px 7px'
						}}
					>
						{counts[type]}
					</span>
				</button>
			))}
		</div>
	)
}
