import img1 from '../assets/vca.jpg'
export const PINS = [
	{
		id: 1,
		type: 'recycle',
		lat: -14.862,
		lng: -40.845,
		title: 'Ecoponto Candeias',
		desc: 'Aceita plástico, papel, vidro e metal. Seg–Sáb 8h–17h.',
		status: 'verificado',
		image: img1
	},
	{
		id: 2,
		type: 'recycle',
		lat: -14.869,
		lng: -40.831,
		title: 'Ponto Verde Centro',
		desc: 'Coleta seletiva municipal. Funciona todos os dias.',
		status: 'verificado'
	},
	{
		id: 3,
		type: 'descarte',
		lat: -14.855,
		lng: -40.852,
		title: 'Contêiner Urbano',
		desc: 'Resíduos domésticos. Coleta segunda e quinta.',
		status: 'verificado'
	},
	{
		id: 4,
		type: 'descarte',
		lat: -14.875,
		lng: -40.838,
		title: 'Ponto de Entrega',
		desc: 'Contêiner oficial da prefeitura.',
		status: 'verificado'
	},
	{
		id: 5,
		type: 'esgoto',
		lat: -14.865,
		lng: -40.858,
		title: 'Esgoto a Céu Aberto',
		desc: 'Relatado por moradores do bairro Jurema. Aguardando EMBASA.',
		status: 'em análise'
	},
	{
		id: 6,
		type: 'denuncia',
		lat: -14.878,
		lng: -40.843,
		title: 'Lixo em Terreno Baldio',
		desc: 'Acúmulo irregular próximo à escola municipal.',
		status: 'triagem'
	},
	{
		id: 7,
		type: 'denuncia',
		lat: -14.858,
		lng: -40.862,
		title: 'Descarte Irregular',
		desc: 'Entulho e resíduos em via pública.',
		status: 'triagem'
	},
	{
		id: 8,
		type: 'denuncia',
		lat: -14.871,
		lng: -40.827,
		title: 'Lixo no Córrego',
		desc: 'Resíduos sólidos no córrego do bairro Brasil.',
		status: 'em análise'
	}
]

export const PIN_CONFIG = {
	recycle: {
		color: '#22c55e',
		bg: '#dcfce7',
		text: '#15803d',
		label: 'Reciclagem',
		emoji: '♻️'
	},
	descarte: {
		color: '#3b82f6',
		bg: '#dbeafe',
		text: '#1d4ed8',
		label: 'Descarte',
		emoji: '🗑️'
	},
	esgoto: {
		color: '#f59e0b',
		bg: '#fef3c7',
		text: '#b45309',
		label: 'Esgoto',
		emoji: '⚠️'
	},
	denuncia: {
		color: '#ef4444',
		bg: '#fee2e2',
		text: '#b91c1c',
		label: 'Denúncia',
		emoji: '📍'
	},
	Ongs: {
		color: '#A020F0',
		bg: '#fee2e2',
		text: '#b91c1c',
		label: 'Ongs',
		emoji: '🫂'
	}
}

export const STATUS_STYLE = {
	verificado: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
	'em análise': { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
	triagem: { bg: '#fee2e2', color: '#b91c1c', dot: '#ef4444' }
}

export const WHATSAPP_NUMBER = '5577999695024'
