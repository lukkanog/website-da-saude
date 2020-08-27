using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Usuarios
    {
        public int IdUsuario { get; set; }

        [Required(ErrorMessage="O usuário deve ter uma permissão vinculada")]
        public int IdPermissao { get; set; }

        [Required(ErrorMessage="O usuário deve ter um nome atribuído")]
        public string NomeUsuario { get; set; }

        [Required(ErrorMessage = "Informe a data de nascimento")]
        public DateTime DataNascimento { get; set; }
        
        [Required(ErrorMessage = "Informe o email do usuário")]
        [EmailAddress(ErrorMessage = "Informe um email válido")]
        public string Email { get; set; }
    
        [Required(ErrorMessage="Informe a senha do usuário")]
        [StringLength(255,MinimumLength=6)]
        public string Senha { get; set; }
        public int? IdBairro { get; set; }
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public int? Numero { get; set; }

        public virtual Bairros IdBairroNavigation { get; set; }
        public virtual Permissoes IdPermissaoNavigation { get; set; }
    }
}
