
# ----------- Environment Variables ----------- #

# This is customizing our terminal prompt.
PS1="\u:\W "

# --------------------------------------------- #




# ------------------ Aliases ------------------ #

# This adds color to our ls output
alias ls="ls -G"

# Opens up the .bashrc file and then once it's done with, it's sourced
alias bconfig="code -w ~/.bashrc && source ~/.bashrc"

# --------------------------------------------- #





# ----------------- Functions ----------------- #

# This defines a new command 'des' which will directly take us to the Desktop
des(){
    cd ~/Desktop
}

# This defines a new command 'cur' which will directly takes us to our current working directory
cur(){
    cd ~/personal-code/DeepDive-Node.js/Joseph\ Heidari/UNIX
}

# --------------------------------------------- #


# ---------------- Other Apps ----------------- #
# --------------------------------------------- #