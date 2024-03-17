'use client'

import style from './ParamEditor.module.css'
import { Dispatch, SetStateAction, useState } from 'react'

export interface Param {
	id: number
	name: string
	type: string
}
interface ParamValue {
	paramId: number
	value: string
}
interface Color {
	hex: string
}
export interface Model {
	paramValues: ParamValue[]
	colors: Color[]
}
interface Props {
	params: Param[]
	model: Model
}

interface GetModelI {
	name: string
	value: string
}

export default function ParamEditor({ params, model }: Props) {
	const [store, setStore] = useState<Props>({ params, model })

	const getModel = (store: Props) => {
		const model: GetModelI[] = []

		for (const param of params) {
			const paramValue = store.model.paramValues.find(
				value => value.paramId === param.id
			)
			// value is not defined
			if (!paramValue) {
				model.push({
					name: param.name,
					value: '',
				})
				continue
			}
			// value is defined
			model.push({
				name: param.name,
				value: paramValue.value,
			})
		}

		console.log(model)
		return model
	}

	return (
		<div className={style.wrapper}>
			<span className={style.description}>
				ParamEditor — редактор значений существующих параметров. Кнопка
				сохранения сохраняет в предпологаемое хранилище, которое мжно легко
				связать с этим приложением. В настоящее время все изменения хранятся
				только до первой перезагрузки. Статус сохранения смотрите в консоли.
				<br />
				<br />
				getModel не была использована в этом приложении, но реализована.{' '}
				<span className={style.accent}>
					getModel можно протестировать нажав на кнопку и посмотрев в консоль.
				</span>
			</span>
			<button onClick={() => getModel(store)}>Протестировать GetModel</button>
			{store.params.map((param, index) => {
				const paramValue = store.model.paramValues.find(
					value => value.paramId === param.id
				)

				return (
					<div className={style.param}>
						<span className={style.paramName}>{param.name}</span>
						<div className={style.paramValues}>
							{paramValue && (
								<ParamValue
									paramValue={paramValue}
									store={store}
									setStore={setStore}
								/>
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}

interface ParamValueProps {
	paramValue: ParamValue
	store: Props
	setStore: Dispatch<SetStateAction<Props>>
}

function ParamValue({ paramValue, store, setStore }: ParamValueProps) {
	const [value, setValue] = useState<string>(paramValue.value)

	// save param value in data (localStorage / Firestore / and other)
	const saveValue = () => {
		const tempStore: Props = JSON.parse(JSON.stringify(store))
		const valueIndex = tempStore.model.paramValues.findIndex(
			value => value.paramId === paramValue.paramId
		)
		if (valueIndex < 0) {
			console.log('not saved, value not found')
			return
		}
		tempStore.model.paramValues[valueIndex].value = value
		setStore(tempStore)
		console.log('saved', tempStore)
	}

	return (
		<div className={style.paramValue}>
			<input
				type='text'
				onChange={e => setValue(e.target.value)}
				value={value}
			/>
			<button className={style.saveButton} onClick={saveValue}>
				SAVE
			</button>
		</div>
	)
}
