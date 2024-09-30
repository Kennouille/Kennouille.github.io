import subprocess

def git_push():
    try:
        # Ajouter tous les fichiers modifiés
        subprocess.run(["git", "add", "."], check=True)
        
        # Commiter les changements
        commit_message = "Automated commit"
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        
        # Pousser les changements vers le dépôt distant
        subprocess.run(["git", "push", "origin", "main"], check=True)
        
        print("Code pushed to GitHub successfully!")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    git_push()
