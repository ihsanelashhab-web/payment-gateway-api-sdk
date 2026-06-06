// Auto-generated SDK for Payment Gateway API v3.0.0
// Do not edit manually

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class ApiClient {

  private static final String BASE_URL = "https://api.payments.com/v3";
  private String apiKey = "";
  private String bearerToken = "";
  private final HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(30)).build();

  public void setApiKey(String key) { this.apiKey = key; }
  public void setBearerToken(String token) { this.bearerToken = token; }

  private String request(String method, String path, String body) throws Exception {
    HttpRequest.Builder builder = HttpRequest.newBuilder()
      .uri(URI.create(BASE_URL + path))
      .header("Content-Type", "application/json");
    if (!apiKey.isEmpty()) builder.header("X-API-Key", apiKey);
    if (!bearerToken.isEmpty()) builder.header("Authorization", "Bearer " + bearerToken);
    if (method.equals("GET")) builder.GET();
    else builder.method(method, HttpRequest.BodyPublishers.ofString(body != null ? body : ""));
    HttpResponse<String> response = client.send(builder.build(), HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() >= 400)
      throw new RuntimeException("API Error: " + response.statusCode());
    return response.body();
  }

  /** List transactions */
  public String getTransactions() throws Exception {
    return request("GET", "/transactions", null);
  }

  /** Create transaction */
  public String createTransaction() throws Exception {
    return request("POST", "/transactions", null);
  }

  /** Refund transaction */
  public String refundTransaction(String id) throws Exception {
    return request("POST", "/transactions/" + id + "/refund", null);
  }

  /** Get saved cards */
  public String getCards() throws Exception {
    return request("GET", "/cards", null);
  }

  /** Add new card */
  public String addCard() throws Exception {
    return request("POST", "/cards", null);
  }

  /** Register webhook */
  public String registerWebhook() throws Exception {
    return request("POST", "/webhooks", null);
  }

}