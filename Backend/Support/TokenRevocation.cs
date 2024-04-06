public interface ITokenRevocationService
{
    void RevokeToken(string token);
    bool isTokenRevoked(string token);
}

public class TokenRevocation:ITokenRevocationService
{
    private readonly List<string> _revokedTokens=new List<string>();

    public void RevokeToken(string Token){
        _revokedTokens.Add(Token);
    }

    public bool isTokenRevoked(string token){
        return _revokedTokens.Contains(token);
    }
}