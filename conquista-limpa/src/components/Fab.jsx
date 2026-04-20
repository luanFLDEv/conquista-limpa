export default function Fab({ onClick }) {
	return (
		<button
			onClick={onClick}
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
	)
}
