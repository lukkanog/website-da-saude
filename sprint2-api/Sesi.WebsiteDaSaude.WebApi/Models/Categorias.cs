using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Categorias
    {
        public Categorias()
        {
            Servicos = new HashSet<Servicos>();
        }

        public int IdCategoria { get; set; }
        public string NomeCategoria { get; set; }

        public virtual ICollection<Servicos> Servicos { get; set; }
    }
}
