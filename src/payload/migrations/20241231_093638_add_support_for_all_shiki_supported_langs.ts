import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Remove default for code_language
    ALTER TABLE pages_blocks_script_copy_btn ALTER COLUMN code_language DROP DEFAULT;

    -- Temporarily set column type to VARCHAR to allow type drop
    ALTER TABLE pages_blocks_script_copy_btn ALTER COLUMN code_language TYPE VARCHAR;

    -- Drop the old enum type
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_script_copy_btn_code_language";

    -- Create the new enum type with all Shiki-supported languages
    CREATE TYPE "public"."enum_pages_blocks_script_copy_btn_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig', 'adoc', 'batch', 'be', '1c', 'cdc', 'clj', 'ql', 'coffeescript', 'lisp', 'c++', 'c#', 'cs', 'cql', 'dockerfile', 'elisp', 'erl', 'ftl', 'f', 'for', 'f77', 'f90', 'f95', 'f03', 'f08', 'f18', 'f#', 'fs', 'gjs', 'gts', 'gql', 'hbs', 'hs', 'properties', 'js', 'fsl', 'jl', 'kt', 'kts', 'kql', 'lean4', 'makefile', 'md', 'mmd', 'mips', 'nar', 'nf', 'nu', 'objc', 'pot', 'potx', 'ps', 'ps1', 'protobuf', 'jade', 'py', 'perl6', 'regex', 'rb', 'rs', '1c-query', 'shader', 'bash', 'sh', 'shell', 'zsh', 'console', 'closure-templates', 'spl', 'styl', 'talon', 'tf', 'tfvars', 'lit', 'ts', 'tsp', 'typ', 'cmd', 'vim', 'vimscript', 'vy', '文言', 'mediawiki', 'wiki', 'wl', 'yml');

    -- Alter column to use the new enum type
    ALTER TABLE pages_blocks_script_copy_btn 
    ALTER COLUMN code_language TYPE "public"."enum_pages_blocks_script_copy_btn_code_language" 
    USING code_language::"public"."enum_pages_blocks_script_copy_btn_code_language";

    -- Restore the default value for code_language if needed
    ALTER TABLE pages_blocks_script_copy_btn 
    ALTER COLUMN code_language SET DEFAULT 'yaml';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Remove default for code_language
    ALTER TABLE pages_blocks_script_copy_btn ALTER COLUMN code_language DROP DEFAULT;

    -- Temporarily set column type to VARCHAR to allow type drop
    ALTER TABLE pages_blocks_script_copy_btn ALTER COLUMN code_language TYPE VARCHAR;

    -- Drop the new enum type
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_script_copy_btn_code_language";

    -- Recreate the original enum type
    CREATE TYPE "public"."enum_pages_blocks_script_copy_btn_code_language" AS ENUM('shell', 'typescript', 'javascript', 'python');

    -- Alter column back to use the original enum type
    ALTER TABLE pages_blocks_script_copy_btn 
    ALTER COLUMN code_language TYPE "public"."enum_pages_blocks_script_copy_btn_code_language" 
    USING code_language::"public"."enum_pages_blocks_script_copy_btn_code_language";

    -- Restore the original default if needed
    ALTER TABLE pages_blocks_script_copy_btn 
    ALTER COLUMN code_language SET DEFAULT 'shell';
  `);
}
