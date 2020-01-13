using System;
using System.Collections.Generic;
using System.Linq;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class TipoLocalRepository : ITIpoLocalRepository
    {
        public void Cadastrar(TiposLocais tipo)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                ctx.TiposLocais.Add(tipo);
                ctx.SaveChanges();
            }
        }

        public void Excluir(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var tipoBuscado = ctx.TiposLocais.FirstOrDefault(x => x.IdTipoLocal == id);

                if (tipoBuscado == null)
                {
                    throw new Exception("Tipo de local não encontrado.");
                }else
                {
                    ctx.TiposLocais.Remove(tipoBuscado);
                    ctx.SaveChanges();
                }

            }

        }

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