package cz.utb.fai.howtodobiotech.payload.response;

public class AuthResponse {
    private String token;
    private Integer userId;


    public AuthResponse(String token, Integer userId) {
        this.token = token;
        this.userId = userId;
    }


    public String getToken() {
        return token;
    }

    public Integer getUserId() {
        return userId;
    }
}
