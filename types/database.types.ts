// Hand-written to match supabase/migrations. Regenerate after linking the project:
//   supabase gen types typescript --linked > types/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          address1: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          first_name: string
          id: string
          last_name: string
          postal_code: string | null
          state: string | null
        }
        Insert: {
          address1?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name: string
          id: string
          last_name: string
          postal_code?: string | null
          state?: string | null
        }
        Update: {
          address1?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name?: string
          id?: string
          last_name?: string
          postal_code?: string | null
          state?: string | null
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
