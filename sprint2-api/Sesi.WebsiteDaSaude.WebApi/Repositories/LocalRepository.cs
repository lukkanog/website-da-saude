using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories 
{
    public class LocalRepository : ILocalRepository 
    {
        public Locais BuscarPorId (int id) 
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var localBuscado = ctx.Locais
                    .Include(x => x.IdTipoLocalNavigation)
                    .Include(x => x.IdBairroNavigation)
                    .FirstOrDefault(x => x.IdLocal == id);

                if (localBuscado != null)
                {
                    return localBuscado;
                }

                return null;
            }
        }

        public void Cadastrar (Locais local) 
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                if (local.Cep.Contains("-"))
                {
                    local.Cep = local.Cep.Replace("-","");
                }

                ctx.Add(local);
                ctx.SaveChanges();
            }
        }

        public void Editar (Locais localPassado) 
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var localBuscado = ctx.Locais.FirstOrDefault(x => x.IdLocal == localPassado.IdLocal);

                if (localBuscado == null)
                {
                    throw new Exception("Local não encontrado.");
                } else
                {
                    localBuscado.IdTipoLocal = localPassado.IdTipoLocal;
                    localBuscado.NomeLocal = localPassado.NomeLocal;
                    localBuscado.Capacidade = localPassado.Capacidade;
                    localBuscado.Cep = localPassado.Cep;
                    localBuscado.IdBairro = localPassado.IdBairro;
                    localBuscado.Logradouro = localPassado.Logradouro;
                    localBuscado.Numero = localPassado.Numero;

                    if (localBuscado.Cep.Contains("-"))
                    {
                        localBuscado.Cep = localBuscado.Cep.Replace("-","");
                    }


                    ctx.Update(localBuscado);
                    ctx.SaveChanges();
                }

            }
        }

        public void Excluir (int id) 
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var localBuscado = ctx.Locais.FirstOrDefault(x => x.IdLocal == id);

                if (localBuscado == null)
                {
                    throw new Exception("Local não encontrado.");
                } else
                {
                    ctx.Locais.Remove(localBuscado);
                    ctx.SaveChanges();
                }
            }
        }

        public List<Locais> Listar () 
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext ())
             {
                var lista = ctx.Locais
                    .Include (x => x.IdTipoLocalNavigation)
                    .Include (x => x.IdBairroNavigation)
                    .ToList ();

                return lista;
            }
        }

        public List<Locais> ListarPorBairro (int idBairro) 
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext ()) 
            {
                var lista = ctx.Locais
                    .Where (x => x.IdBairro == idBairro)
                    .Include (x => x.IdTipoLocalNavigation)
                    .Include (x => x.IdBairroNavigation)
                    .ToList ();

                return lista;
            }
        }

        public List<Locais> ListarPorTipoDeLocal (int idTipoLocal) 
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext ()) 
            {
                var lista = ctx.Locais
                    .Where (x => x.IdTipoLocal == idTipoLocal)
                    .Include (x => x.IdTipoLocalNavigation)
                    .Include (x => x.IdBairroNavigation)
                    .ToList ();

                return lista;
            }        
        }
    }
}