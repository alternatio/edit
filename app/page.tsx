import styles from './page.module.css'
import ParamEditor, { Model, Param } from '@/app/ParamEditor'

const testModel: Model = {
	paramValues: [
		{
			paramId: 0,
			value: 'value0',
		},
		{
			paramId: 1,
			value: 'value1',
		},
		{
			paramId: 1,
			value: 'value1.1',
		},
		{
			paramId: 1,
			value: 'value1.2',
		},
		{
			paramId: 2,
			value: 'value2',
		},
	],
	colors: [],
}

const testParams: Param[] = [
	{
		id: 0,
		name: 'Назначение',
		type: '',
	},
	{
		id: 1,
		name: 'Длина',
		type: '',
	},
	{
		id: 2,
		name: 'Цена',
		type: '',
	},
]

export default function Home() {
	return (
		<main className={styles.wrapper}>
			<ParamEditor model={testModel} params={testParams} />
		</main>
	)
}
