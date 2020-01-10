using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Situacoes
    {
        public int IdSituacao { get; set; }
        public string NomeSituacao { get; set; }
        public string Descricao { get; set; }
        public virtual List<ServicosPrestados> ServicosPrestados { get; set; }

    }
}
