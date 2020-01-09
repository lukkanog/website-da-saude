using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Bairros
    {
        public Bairros()
        {
            Locais = new HashSet<Locais>();
            Usuarios = new HashSet<Usuarios>();
        }

        public int IdBairro { get; set; }
        public string NomeBairro { get; set; }

        public virtual ICollection<Locais> Locais { get; set; }
        public virtual ICollection<Usuarios> Usuarios { get; set; }
    }
}
