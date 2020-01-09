using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class TiposLocais
    {
        public TiposLocais()
        {
            Locais = new HashSet<Locais>();
        }

        public int IdTipoLocal { get; set; }
        public string NomeTipolocal { get; set; }

        public virtual ICollection<Locais> Locais { get; set; }
    }
}
