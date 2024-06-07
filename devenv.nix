{ pkgs, lib, config, inputs, ... }:
{
  # https://devenv.sh/packages/
  packages = with pkgs; [ ];

  # https://devenv.sh/scripts/
  scripts = {};

  # https://devenv.sh/services/
  services = {};

  # https://devenv.sh/languages/
  languages = {
    typescript.enable = true;
    javascript = {
      enable = true;
      package = pkgs.nodejs_20;
      npm.enable = true;
    };
  };

  # https://devenv.sh/pre-commit-hooks/
  pre-commit.hooks = {};

  # https://devenv.sh/processes/
  processes = {};
}
