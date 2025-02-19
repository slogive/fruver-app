import { Badge, Button, notification, Popover, Table, TableProps } from 'antd'
import { ArgsProps } from 'antd/es/notification'
import { createContext, JSX, useState } from 'react'
import { BiCart, BiCartAdd, BiStore, BiUser, BiX } from 'react-icons/bi'
import { v4 as UUID } from 'uuid'

const IVA_RATE = 0.25

const productNames = [
	'Manzana',
	'Naranja',
	'Plátano',
	'Pera',
	'Uva',
	'Mango',
	'Fresa',
	'Kiwi',
	'Sandía',
	'Melón',
	'Piña',
	'Durazno',
	'Cereza',
	'Frambuesa',
	'Arándano',
	'Limón',
	'Mandarina',
	'Pomelo',
	'Coco',
	'Papaya',
	'Guayaba',
	'Maracuyá',
	'Higo',
	'Granada',
	'Ciruela',
	'Albaricoque',
	'Lichi',
	'Tamarindo',
	'Chirimoya',
	'Carambola',
]

const prices = [1500, 500, 3500, 2000, 2500, 1000, 3000]

const staticProducts = productNames.map((name, index) => ({
	id: UUID(),
	name,
	price: prices[index % prices.length],
}))

const Context = createContext({ name: 'Default' })

const toLocaleString = (value: number): string =>
	`$ ${value.toLocaleString('es-CO')}`

const StorePage = (): JSX.Element => {
	/**
	 * Hook de notificaciones
	 */
	const [api, contextHolder] = notification.useNotification()

	/**
	 * Lista de productos comprados
	 */
	const [buys, setBuys] = useState<
		{ id: string; name: string; quantity: number; price: number }[]
	>([])

	/**
	 * Muestra una notificación
	 */
	const openNotification = (
		message: string,
		type: ArgsProps['type'] = 'success',
		placement: ArgsProps['placement'] = 'topRight'
	): void => {
		new Promise((resolve) => {
			api.destroy()

			resolve(true)
		}).then(() => {
			api.open({
				type,
				message,
				placement,
				closable: true,
				duration: 3,
				pauseOnHover: true,
				icon: <BiCart />,
			})
		})
	}

	/**
	 * Añade un producto a la lista de compras
	 */
	const addProductToBuys = (product: {
		id: string
		name: string
		price: number
	}) => {
		const existingProduct = buys.find((buy) => buy.id === product.id)

		if (existingProduct) {
			if (existingProduct.quantity < 49) {
				setBuys(
					buys.map((buy) =>
						buy.id === product.id ? { ...buy, quantity: buy.quantity + 1 } : buy
					)
				)
				openNotification(`${product.name} fue añadido/a`)
			} else {
				openNotification(
					`No puedes añadir más de 49 unidades de ${product.name}`,
					'warning'
				)
			}
		} else {
			setBuys([...buys, { ...product, quantity: 1 }])
			openNotification(`${product.name} fue añadido/a`)
		}
	}

	/**
	 * Resta una unidad al producto
	 */
	const subtractProduct = (id: string) => {
		const product = buys.find((buy) => buy.id === id)
		setBuys(
			buys
				.map((buy) =>
					buy.id === id
						? buy.quantity > 1
							? { ...buy, quantity: buy.quantity - 1 }
							: null
						: buy
				)
				.filter((buy) => buy !== null) as {
				id: string
				name: string
				quantity: number
				price: number
			}[]
		)

		if (product && product.quantity === 1) {
			openNotification(`${product.name} fue eliminado/a`)
		}
	}

	/**
	 * Calcula el total de la compra
	 */
	const total = buys.reduce((sum, buy) => sum + buy.quantity * buy.price, 0)
	const totalIVA = buys.reduce(
		(sum, buy) => sum + buy.quantity * buy.price * IVA_RATE,
		0
	)
	const totalQuantity = buys.reduce((sum, buy) => sum + buy.quantity, 0)

	/**
	 * Añadir producto
	 */
	const AddProduct = ({
		product,
	}: {
		product: {
			id: string
			name: string
			quantity: number
			price: number
		}
	}): JSX.Element => {
		return (
			<Button
				onClick={() => addProductToBuys(product)}
				disabled={product.quantity >= 99}
				className='add'
				icon={<BiCartAdd />}
			/>
		)
	}

	/**
	 * Eliminar producto
	 */
	const DeleteProduct = ({
		product,
	}: {
		product: {
			id: string
			name: string
			quantity: number
			price: number
		}
	}): JSX.Element => {
		return product.quantity === 1 ? (
			<Popover
				content={
					<div>
						<p>¿Está seguro de eliminar este/a {product.name}?</p>
						<Button onClick={() => subtractProduct(product.id)}>Sí</Button>
					</div>
				}
				title='Confirmar eliminación'
				trigger='click'
			>
				<Button
					className='subtract'
					icon={<BiX />}
				/>
			</Popover>
		) : (
			<Button
				disabled={product.quantity < 1}
				onClick={() => subtractProduct(product.id)}
				className='subtract'
				icon={<BiX />}
			/>
		)
	}

	/**
	 * Columnas de la tabla
	 */
	const columns: TableProps<{
		id: string
		name: string
		quantity: number
		price: number
	}>['columns'] = [
		{
			title: 'Producto',
			dataIndex: 'name',
			key: 'name',
			align: 'left',
		},
		{
			title: 'Cantidad',
			dataIndex: 'quantity',
			key: 'quantity',
			align: 'right',
		},
		{
			title: `IVA (${IVA_RATE * 100}%)`,
			key: 'iva',
			align: 'right',
			render: (_: unknown, record: { quantity: number; price: number }) =>
				`${toLocaleString(record.quantity * record.price * IVA_RATE)}`,
		},
		{
			title: 'Precio por unidad',
			dataIndex: 'price',
			key: 'price',
			align: 'right',
			render: (price: number) => `${toLocaleString(price)}`,
		},
		{
			title: 'Precio total',
			key: 'totalPrice',
			align: 'right',
			render: (_: unknown, record: { quantity: number; price: number }) =>
				`${toLocaleString(record.quantity * record.price)}`,
		},

		{
			title: 'Acciones',
			key: 'actions',
			align: 'center',
			width: 150,
			render: (
				_: unknown,
				record: { id: string; name: string; quantity: number; price: number }
			) => (
				<div className='actions'>
					<DeleteProduct product={{ ...record }} />

					<AddProduct product={{ ...record }} />
				</div>
			),
		},
	]

	return (
		<Context.Provider value={{ name: 'Custom' }}>
			{contextHolder}
			<div className='store'>
				<header>
					<BiStore className='logo' />

					<h1>Fruver App</h1>

					<div className='user'>
						<BiUser />
						<span>Cesar Fonseca</span>
					</div>
				</header>

				<section className='products'>
					{staticProducts.map((product) => {
						const buy = buys.find((buy) => buy.id === product.id)
						return (
							<Badge
								count={buy ? buy.quantity : 0}
								key={product.id}
								className='product'
							>
								<span>
									<b>{product.name}</b>
								</span>

								<span>{toLocaleString(product.price)}</span>

								<div className='actions'>
									<DeleteProduct
										product={{ ...product, quantity: buy?.quantity || 0 }}
									/>

									<AddProduct
										product={{ ...product, quantity: buy?.quantity || 0 }}
									/>
								</div>
							</Badge>
						)
					})}
				</section>

				<Table
					dataSource={buys || []}
					columns={columns}
					rowKey='id'
					locale={{ emptyText: 'No hay productos' }}
					pagination={false}
					rootClassName='table'
					summary={() => (
						<Table.Summary.Row>
							<Table.Summary.Cell
								index={0}
								colSpan={2}
							>
								Total
							</Table.Summary.Cell>
							<Table.Summary.Cell
								index={1}
								align='right'
							>
								<b>{totalQuantity}</b>
							</Table.Summary.Cell>
							<Table.Summary.Cell
								index={2}
								align='right'
							>
								<b>{toLocaleString(totalIVA)}</b>
							</Table.Summary.Cell>
							<Table.Summary.Cell index={3} />
							<Table.Summary.Cell
								index={4}
								align='right'
							>
								<b>{toLocaleString(total)}</b>
							</Table.Summary.Cell>
						</Table.Summary.Row>
					)}
				/>

				<footer>Fruver App &copy; {new Date().getFullYear()}</footer>
			</div>
		</Context.Provider>
	)
}

export default StorePage
