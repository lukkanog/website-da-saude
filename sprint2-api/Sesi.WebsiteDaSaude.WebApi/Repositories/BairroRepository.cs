using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class BairroRepository : IBairroRepository
    {
        public Bairros BuscarPorId(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var bairro = ctx.Bairros.Include(x => x.Locais).FirstOrDefault(x => x.IdBairro == id);

                if(bairro != null)
                {
                    return bairro;
                }

                return null;
            }
        }

        public List<Bairros> BuscarPorNome(string nomeBairro)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Bairros.Where(x => EF.Functions.Like(x.NomeBairro, $"%{nomeBairro}%")).ToList();

                return lista;
            }
        }

        public List<Bairros> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Bairros.ToList();
                return lista;
            }
        }

        public List<Bairros> ListarLocais()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Bairros.Include(x => x.Locais).ToList();
                return lista;
            }
        }
    }
}