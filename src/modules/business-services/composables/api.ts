interface PostOptions {
  title: string
  description?: string
  duration: number
}

interface GetOptions {
  id?: string
}

interface UpdateOptions {
  id: string
  title: string
  description?: string
  duration: number
}

export async function getServices({ id }: GetOptions) {
  const result = await useAsyncData('services', () => {})

  return result
}

export async function updateService(data: UpdateOptions) {
  // const result = await useAsyncData('services', () => {})
  // return result
}

export async function createService(data: PostOptions) {}

export async function deleteService({ id }: GetOptions) {}
