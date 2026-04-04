export interface Distributor {
  username: string
  kategori: string
  produk: string
  lokasi: string | null
  is_distributor: boolean
  summary: string
  original_text?: string
  permalink?: string
}
