export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      educations: {
        Row: {
          createdAt: string
          dateFrom: string
          dateTo: string | null
          description: string | null
          id: string
          isCurrent: boolean
          subtitle: string
          title: string
          user: string
        }
        Insert: {
          createdAt?: string
          dateFrom: string
          dateTo?: string | null
          description?: string | null
          id?: string
          isCurrent: boolean
          subtitle: string
          title: string
          user: string
        }
        Update: {
          createdAt?: string
          dateFrom?: string
          dateTo?: string | null
          description?: string | null
          id?: string
          isCurrent?: boolean
          subtitle?: string
          title?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "educations_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          createdAt: string
          dateFrom: string
          dateTo: string | null
          description: string | null
          id: string
          isCurrent: boolean
          subtitle: string
          title: string
          user: string
        }
        Insert: {
          createdAt?: string
          dateFrom: string
          dateTo?: string | null
          description?: string | null
          id?: string
          isCurrent: boolean
          subtitle: string
          title: string
          user: string
        }
        Update: {
          createdAt?: string
          dateFrom?: string
          dateTo?: string | null
          description?: string | null
          id?: string
          isCurrent?: boolean
          subtitle?: string
          title?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          address: string
          createdAt: string
          desiredPosition: string[]
          email: string
          expectedSalary: string
          fullName: string
          id: string
          intro: string
          languages: string[]
          phoneNumber: string
          skills: string[]
          user: string
          websiteDesign: Database["public"]["Enums"]["WebsiteDesigns"]
        }
        Insert: {
          address: string
          createdAt?: string
          desiredPosition: string[]
          email: string
          expectedSalary: string
          fullName: string
          id?: string
          intro: string
          languages: string[]
          phoneNumber: string
          skills: string[]
          user: string
          websiteDesign?: Database["public"]["Enums"]["WebsiteDesigns"]
        }
        Update: {
          address?: string
          createdAt?: string
          desiredPosition?: string[]
          email?: string
          expectedSalary?: string
          fullName?: string
          id?: string
          intro?: string
          languages?: string[]
          phoneNumber?: string
          skills?: string[]
          user?: string
          websiteDesign?: Database["public"]["Enums"]["WebsiteDesigns"]
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subdomains: {
        Row: {
          code: string | null
          createdAt: string
          id: string
          slug: string
          status: Database["public"]["Enums"]["SubdomainStatus"]
          user: string
        }
        Insert: {
          code?: string | null
          createdAt?: string
          id?: string
          slug: string
          status?: Database["public"]["Enums"]["SubdomainStatus"]
          user: string
        }
        Update: {
          code?: string | null
          createdAt?: string
          id?: string
          slug?: string
          status?: Database["public"]["Enums"]["SubdomainStatus"]
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "subdomains_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          createdAt: string
          email: string
          googleId: string
          id: string
          status: Database["public"]["Enums"]["UserStatus"]
        }
        Insert: {
          createdAt?: string
          email: string
          googleId: string
          id?: string
          status?: Database["public"]["Enums"]["UserStatus"]
        }
        Update: {
          createdAt?: string
          email?: string
          googleId?: string
          id?: string
          status?: Database["public"]["Enums"]["UserStatus"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      SubdomainStatus: "ACTIVE" | "HIDDEN"
      UserStatus: "ACTIVE" | "INITIALIZED" | "BLOCKED"
      WebsiteDesigns: "CLASSIC" | "MODERN" | "MINIMALISTIC"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      SubdomainStatus: ["ACTIVE", "HIDDEN"],
      UserStatus: ["ACTIVE", "INITIALIZED", "BLOCKED"],
      WebsiteDesigns: ["CLASSIC", "MODERN", "MINIMALISTIC"],
    },
  },
} as const
