const handleSubmit = async (event) => {
  event.preventDefault();

  const usuario = {
      email: formData.email,
      senha: formData.senha,
      nome: formData.nome,
  };

  try {
      const response = await fetch("/api/usuarios", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
      });

      if (response.ok) {
          const message = await response.text(); // Captura a mensagem de texto
          console.log("Usuário criado:", message);
          alert(message); // Exibe a mensagem para o usuário
      } else {
          const errorMessage = await response.text(); // Captura a mensagem de erro
          console.error("Erro ao criar usuário:", errorMessage);
          alert(errorMessage); // Exibe a mensagem de erro para o usuário
      }
  } catch (error) {
      console.error("Erro na requisição:", error);
  }
};
