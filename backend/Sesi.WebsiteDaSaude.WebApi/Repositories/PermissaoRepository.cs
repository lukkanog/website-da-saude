using System.Collections.Generic;
using System.Linq;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class PermissaoRepository : IPermissaoRepository
    {
        public List<Permissoes> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Permissoes.ToList();
                return lista;
            }
        }
    }
}