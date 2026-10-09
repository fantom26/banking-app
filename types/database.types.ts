// Hand-written to match supabase/migrations. Regenerate after linking the project:
//   supabase gen types typescript --linked > types/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      banks: {
        Row: {
          access_token: string
          account_id: string
          bank_id: string
          created_at: string
          funding_source_url: string
          id: string
          user_id: string
          sharable_id: string
        }
        Insert: {
          access_token: string
          account_id: string
          bank_id: string
          created_at?: string
          funding_source_url: string
          id?: string
          user_id: string
          sharable_id: string
        }
        Update: {
          access_token?: string
          account_id?: string
          bank_id?: string
          created_at?: string
          funding_source_url?: string
          id?: string
          user_id?: string
          sharable_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'banks_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      transactions: {
        Row: {
          amount: number
          category: string
          channel: string
          created_at: string
          email: string
          id: string
          name: string
          receiver_bank_id: string
          receiver_id: string
          sender_bank_id: string
          sender_id: string
          transfer_url: string | null
        }
        Insert: {
          amount: number
          category?: string
          channel?: string
          created_at?: string
          email: string
          id?: string
          name: string
          receiver_bank_id: string
          receiver_id: string
          sender_bank_id: string
          sender_id: string
          transfer_url?: string | null
        }
        Update: {
          amount?: number
          category?: string
          channel?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          receiver_bank_id?: string
          receiver_id?: string
          sender_bank_id?: string
          sender_id?: string
          transfer_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'transactions_receiver_bank_id_fkey'
            columns: ['receiver_bank_id']
            isOneToOne: false
            referencedRelation: 'banks'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transactions_receiver_id_fkey'
            columns: ['receiver_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transactions_sender_bank_id_fkey'
            columns: ['sender_bank_id']
            isOneToOne: false
            referencedRelation: 'banks'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transactions_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          address1: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          dwolla_customer_id: string | null
          dwolla_customer_url: string | null
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
          dwolla_customer_id?: string | null
          dwolla_customer_url?: string | null
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
          dwolla_customer_id?: string | null
          dwolla_customer_url?: string | null
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
