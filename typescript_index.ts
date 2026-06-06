// Auto-generated SDK for Payment Gateway API v3.0.0
// Do not edit manually

const BASE_URL = "https://api.payments.com/v3";

let _apiKey: string | null = null;
let _bearerToken: string | null = null;

export function setApiKey(key: string): void {
  _apiKey = key;
}

export function setBearerToken(token: string): void {
  _bearerToken = token;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function request(method: string, path: string, body?: Record<string, unknown>, params?: Record<string, string>, retries = 3): Promise<unknown> {
  let url = BASE_URL + path;
  if (params) {
    const query = new URLSearchParams(params).toString();
    if (query) url += "?" + query;
  }
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (_apiKey) headers["X-API-Key"] = _apiKey;
  if (_bearerToken) headers["Authorization"] = "Bearer " + _bearerToken;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.status === 429 || res.status >= 500) {
        if (attempt < retries) { await sleep(attempt * 1000); continue; }
      }
      if (!res.ok) throw new Error("API Error: " + res.status + " " + res.statusText);
      return res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(attempt * 1000);
    }
  }
}

/** Fetch all pages automatically */
export async function paginate(fn: (page: number) => Promise<unknown>, maxPages = 10): Promise<unknown[]> {
  const results: unknown[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const data = await fn(page);
    if (!data || (Array.isArray(data) && data.length === 0)) break;
    if (Array.isArray(data)) results.push(...data);
    else if (data.data) results.push(...data.data);
    else { results.push(data); break; }
  }
  return results;
}

/** List transactions */
export async function getTransactions(params?: Record<string, string>): Promise<unknown> {
  return request("GET", `/transactions`, undefined, params);
}

/** Create transaction */
export async function createTransaction(): Promise<unknown> {
  return request("POST", `/transactions`);
}

/** Refund transaction */
export async function refundTransaction(id: string): Promise<unknown> {
  return request("POST", `/transactions/${id}/refund`);
}

/** Get saved cards */
export async function getCards(): Promise<unknown> {
  return request("GET", `/cards`);
}

/** Add new card */
export async function addCard(): Promise<unknown> {
  return request("POST", `/cards`);
}

/** Register webhook */
export async function registerWebhook(): Promise<unknown> {
  return request("POST", `/webhooks`);
}
