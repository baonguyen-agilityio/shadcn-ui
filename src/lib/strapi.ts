const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

class StrapiClient {
  private baseUrl: string;
  private token?: string;

  constructor() {
    this.baseUrl = STRAPI_URL;
    this.token = STRAPI_API_TOKEN;
  }

  private async request<T>(endpoint: string): Promise<StrapiResponse<T>> {
    const url = `${this.baseUrl}/api${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    return response.json();
  }

  async getAll<T>(
    collection: string,
    params?: URLSearchParams
  ): Promise<StrapiResponse<T[]>> {
    const url = params
      ? `/${collection}?${params.toString()}`
      : `/${collection}`;

    return this.request<T[]>(url);
  }
}

export const strapiClient = new StrapiClient();
