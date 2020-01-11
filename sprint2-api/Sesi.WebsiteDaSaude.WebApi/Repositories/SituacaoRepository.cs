using System.Collections.Generic;
using System.Linq;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class SituacaoRepository : ISituacaoRepository
    {
        public List<Situacoes> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Situacoes.ToList(); 
                return lista;
            }
        }
    }
}