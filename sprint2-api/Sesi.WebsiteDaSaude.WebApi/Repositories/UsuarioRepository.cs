using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;
using Sesi.WebsiteDaSaude.WebApi.ViewModels;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public Usuarios BuscarPorEmailESenha(LoginViewModel login)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var usuario = ctx.Usuarios.Include(x => x.IdPermissaoNavigation).FirstOrDefault(x => x.Email == login.Email && x.Senha == login.Senha);

                if (usuario != null)
                {
                    return usuario;
                }

                return null;
            }
        }
    }
}