using Sesi.WebsiteDaSaude.WebApi.Models;
using Sesi.WebsiteDaSaude.WebApi.ViewModels;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuarios BuscarPorEmailESenha(LoginViewModel login);        
    }
}