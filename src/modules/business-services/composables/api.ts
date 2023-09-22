interface PostOptions {
  name: string
  description?: string
  duration: number
}

interface GetOptions {
  id?: string
}

interface UpdateOptions {
  id: string
  name: string
  description?: string
  duration: number
}

export function getServices() {
  const result = useAsyncData('services', async () => {
    await sleep(2000)
    return {
      id: '1',
      name: 'Service 1',
      description: 'Service 1 description',
      duration: 5,
    }
  })

  return result
}

export function getService({ id }: GetOptions) {
  const result = useAsyncData(`service-${id}`, async () => {
    await sleep(2000)
    return {
      id: '1',
      name: 'Service 1',
      description: 'Service 1 description',
      duration: 5,
    }
  })

  return result
}

export async function updateService(data: UpdateOptions) {
  // const result = await useAsyncData('services', () => {})
  // return result
}

export async function createService(data: PostOptions) {}

export async function deleteService({ id }: GetOptions) {}
