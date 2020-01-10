using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Locais
    {
        public int IdLocal { get; set; }
        public int IdTipoLocal { get; set; }
        public string NomeLocal { get; set; }
        public int? Capacidade { get; set; }
        public int IdBairro { get; set; }
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public int Numero { get; set; }

        public virtual Bairros IdBairroNavigation { get; set; }
        public virtual TiposLocais IdTipoLocalNavigation { get; set; }

        public virtual List<LocaisEventos> LocaisEventos { get; set; }
        public virtual List<ServicosPrestados> ServicosPrestados { get; set; }
    }
}
