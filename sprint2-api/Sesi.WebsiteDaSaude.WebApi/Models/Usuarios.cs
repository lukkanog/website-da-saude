using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Usuarios
    {
        public int IdUsuario { get; set; }
        public int IdPermissao { get; set; }
        public string NomeUsuario { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int? IdBairro { get; set; }
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public int? Numero { get; set; }

        public virtual Bairros IdBairroNavigation { get; set; }
        public virtual Permissoes IdPermissaoNavigation { get; set; }
    }
}
