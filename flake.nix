{
  description = "Lambda Calculus parser and interpreter made in TypeScript's type system";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShell = with pkgs; mkShell {
          buildInputs = [
            nodejs
            nodePackages.pnpm
            bun
          ];
        };
      }
    );
}
