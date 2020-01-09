using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Servicos
    {
        public int IdServico { get; set; }
        public int IdCategoria { get; set; }
        public string NomeServico { get; set; }

        public virtual Categorias IdCategoriaNavigation { get; set; }
    }
}
