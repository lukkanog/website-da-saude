using System.Collections.Generic;
using System.Linq;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class TipoLocalRepository : ITIpoLocalRepository
    {
        public List<TiposLocais> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.TiposLocais.ToList();
                return lista;
            }
        }
    }
}