using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Eventos
    {
        public int IdEvento { get; set; }
        public string NomeEvento { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataTermino { get; set; }
    }
}
