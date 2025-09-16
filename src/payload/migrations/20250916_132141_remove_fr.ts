import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Delete all French locale records first
  await db.execute(sql`DELETE FROM "users_locales" WHERE "_locale" = 'fr';`);
  await db.execute(
    sql`DELETE FROM "pages_blocks_paragraph" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "pages_blocks_image" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "pages_blocks_script_copy_btn" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "pages_blocks_code" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "pages_blocks_quote" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "pages_blocks_experience" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "pages_blocks_my_socials" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "pages_blocks_button" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "pages_blocks_tweet_card" WHERE "_locale" = 'fr';`,
  );
  await db.execute(sql`DELETE FROM "pages_locales" WHERE "_locale" = 'fr';`);
  await db.execute(sql`DELETE FROM "pages_rels" WHERE "locale" = 'fr';`);
  await db.execute(
    sql`DELETE FROM "blog_posts_blocks_paragraph" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "blog_posts_blocks_image" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "blog_posts_blocks_code" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "blog_posts_blocks_script_copy_btn" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "blog_posts_blocks_quote" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "blog_posts_blocks_tweet_card" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "blog_posts_locales" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_blog_posts_v_blocks_paragraph" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_blog_posts_v_blocks_image" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_blog_posts_v_blocks_code" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_blog_posts_v_blocks_script_copy_btn" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_blog_posts_v_blocks_quote" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_blog_posts_v_blocks_tweet_card" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_blog_posts_v_locales" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "experience_posts_blocks_paragraph" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "experience_posts_blocks_image" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "experience_posts_blocks_code" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "experience_posts_blocks_script_copy_btn" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "experience_posts_blocks_quote" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "experience_posts_blocks_tweet_card" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "experience_posts_locales" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_experience_posts_v_blocks_paragraph" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_experience_posts_v_blocks_image" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_experience_posts_v_blocks_code" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_experience_posts_v_blocks_script_copy_btn" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_experience_posts_v_blocks_quote" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_experience_posts_v_blocks_tweet_card" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "_experience_posts_v_locales" WHERE "_locale" = 'fr';`,
  );
  await db.execute(
    sql`DELETE FROM "experiences_locales" WHERE "_locale" = 'fr';`,
  );
  await db.execute(sql`DELETE FROM "media_locales" WHERE "_locale" = 'fr';`);
  await db.execute(
    sql`DELETE FROM "main_menu_menu_items_locales" WHERE "_locale" = 'fr';`,
  );

  // Step 2: Convert columns to text first
  await db.execute(sql`
  ALTER TABLE "users_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_experience" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_my_socials" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "blog_posts_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "blog_posts_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "blog_posts_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "blog_posts_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "blog_posts_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "blog_posts_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "blog_posts_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "experience_posts_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "experience_posts_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "experience_posts_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "experience_posts_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "experience_posts_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "experience_posts_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "experience_posts_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_experience_posts_v_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_experience_posts_v_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_experience_posts_v_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_experience_posts_v_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_experience_posts_v_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_experience_posts_v_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_experience_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "experiences_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "main_menu_menu_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  `);

  // Step 3: Drop and recreate the enum type with only 'en'
  await db.execute(sql`DROP TYPE "public"."_locales";`);
  await db.execute(sql`CREATE TYPE "public"."_locales" AS ENUM('en');`);

  // Step 4: Convert columns back to the new enum type
  await db.execute(sql`
  ALTER TABLE "users_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_experience" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_my_socials" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "blog_posts_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "blog_posts_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "blog_posts_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "blog_posts_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "blog_posts_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "blog_posts_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "blog_posts_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_blog_posts_v_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_blog_posts_v_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_blog_posts_v_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_blog_posts_v_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_blog_posts_v_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_blog_posts_v_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_blog_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "experience_posts_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "experience_posts_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "experience_posts_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "experience_posts_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "experience_posts_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "experience_posts_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "experience_posts_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_experience_posts_v_blocks_paragraph" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_experience_posts_v_blocks_image" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_experience_posts_v_blocks_code" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_experience_posts_v_blocks_script_copy_btn" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_experience_posts_v_blocks_quote" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_experience_posts_v_blocks_tweet_card" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_experience_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "experiences_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "main_menu_menu_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  `);

  // Step 5: Handle published_locale columns
  await db.execute(sql`
  ALTER TABLE "_blog_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__blog_posts_v_published_locale";
  CREATE TYPE "public"."enum__blog_posts_v_published_locale" AS ENUM('en');
  ALTER TABLE "_blog_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__blog_posts_v_published_locale" USING "published_locale"::"public"."enum__blog_posts_v_published_locale";
  ALTER TABLE "_experience_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__experience_posts_v_published_locale";
  CREATE TYPE "public"."enum__experience_posts_v_published_locale" AS ENUM('en');
  ALTER TABLE "_experience_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__experience_posts_v_published_locale" USING "published_locale"::"public"."enum__experience_posts_v_published_locale";
  ALTER TABLE "me" ALTER COLUMN "description" SET DEFAULT 'I''m a software engineer';
  `);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'fr';
  ALTER TYPE "public"."enum__blog_posts_v_published_locale" ADD VALUE 'fr';
  ALTER TYPE "public"."enum__experience_posts_v_published_locale" ADD VALUE 'fr';
  ALTER TABLE "pages_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::text;
  DROP TYPE "public"."enum_pages_blocks_script_copy_btn_code_language";
  CREATE TYPE "public"."enum_pages_blocks_script_copy_btn_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig', 'adoc', 'batch', 'be', '1c', 'cdc', 'clj', 'ql', 'coffeescript', 'lisp', 'c++', 'c#', 'cs', 'cql', 'dockerfile', 'elisp', 'erl', 'ftl', 'f', 'for', 'f77', 'f90', 'f95', 'f03', 'f08', 'f18', 'f#', 'fs', 'gjs', 'gts', 'gql', 'hbs', 'hs', 'properties', 'js', 'fsl', 'jl', 'kt', 'kts', 'kql', 'lean4', 'makefile', 'md', 'mmd', 'mips', 'nar', 'nf', 'nu', 'objc', 'pot', 'potx', 'ps', 'ps1', 'protobuf', 'jade', 'py', 'perl6', 'regex', 'rb', 'rs', '1c-query', 'shader', 'bash', 'sh', 'shell', 'zsh', 'console', 'closure-templates', 'spl', 'styl', 'talon', 'tf', 'tfvars', 'lit', 'ts', 'tsp', 'typ', 'cmd', 'vim', 'vimscript', 'vy', '文言', 'mediawiki', 'wiki', 'wl', 'yml');
  ALTER TABLE "pages_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::"public"."enum_pages_blocks_script_copy_btn_code_language";
  ALTER TABLE "pages_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE "public"."enum_pages_blocks_script_copy_btn_code_language" USING "code_language"::"public"."enum_pages_blocks_script_copy_btn_code_language";
  ALTER TABLE "blog_posts_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE text;
  ALTER TABLE "blog_posts_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::text;
  DROP TYPE "public"."enum_blog_posts_blocks_script_copy_btn_code_language";
  CREATE TYPE "public"."enum_blog_posts_blocks_script_copy_btn_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig', 'adoc', 'batch', 'be', '1c', 'cdc', 'clj', 'ql', 'coffeescript', 'lisp', 'c++', 'c#', 'cs', 'cql', 'dockerfile', 'elisp', 'erl', 'ftl', 'f', 'for', 'f77', 'f90', 'f95', 'f03', 'f08', 'f18', 'f#', 'fs', 'gjs', 'gts', 'gql', 'hbs', 'hs', 'properties', 'js', 'fsl', 'jl', 'kt', 'kts', 'kql', 'lean4', 'makefile', 'md', 'mmd', 'mips', 'nar', 'nf', 'nu', 'objc', 'pot', 'potx', 'ps', 'ps1', 'protobuf', 'jade', 'py', 'perl6', 'regex', 'rb', 'rs', '1c-query', 'shader', 'bash', 'sh', 'shell', 'zsh', 'console', 'closure-templates', 'spl', 'styl', 'talon', 'tf', 'tfvars', 'lit', 'ts', 'tsp', 'typ', 'cmd', 'vim', 'vimscript', 'vy', '文言', 'mediawiki', 'wiki', 'wl', 'yml');
  ALTER TABLE "blog_posts_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::"public"."enum_blog_posts_blocks_script_copy_btn_code_language";
  ALTER TABLE "blog_posts_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE "public"."enum_blog_posts_blocks_script_copy_btn_code_language" USING "code_language"::"public"."enum_blog_posts_blocks_script_copy_btn_code_language";
  ALTER TABLE "_blog_posts_v_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::text;
  DROP TYPE "public"."enum__blog_posts_v_blocks_script_copy_btn_code_language";
  CREATE TYPE "public"."enum__blog_posts_v_blocks_script_copy_btn_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig', 'adoc', 'batch', 'be', '1c', 'cdc', 'clj', 'ql', 'coffeescript', 'lisp', 'c++', 'c#', 'cs', 'cql', 'dockerfile', 'elisp', 'erl', 'ftl', 'f', 'for', 'f77', 'f90', 'f95', 'f03', 'f08', 'f18', 'f#', 'fs', 'gjs', 'gts', 'gql', 'hbs', 'hs', 'properties', 'js', 'fsl', 'jl', 'kt', 'kts', 'kql', 'lean4', 'makefile', 'md', 'mmd', 'mips', 'nar', 'nf', 'nu', 'objc', 'pot', 'potx', 'ps', 'ps1', 'protobuf', 'jade', 'py', 'perl6', 'regex', 'rb', 'rs', '1c-query', 'shader', 'bash', 'sh', 'shell', 'zsh', 'console', 'closure-templates', 'spl', 'styl', 'talon', 'tf', 'tfvars', 'lit', 'ts', 'tsp', 'typ', 'cmd', 'vim', 'vimscript', 'vy', '文言', 'mediawiki', 'wiki', 'wl', 'yml');
  ALTER TABLE "_blog_posts_v_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::"public"."enum__blog_posts_v_blocks_script_copy_btn_code_language";
  ALTER TABLE "_blog_posts_v_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE "public"."enum__blog_posts_v_blocks_script_copy_btn_code_language" USING "code_language"::"public"."enum__blog_posts_v_blocks_script_copy_btn_code_language";
  ALTER TABLE "experience_posts_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE text;
  ALTER TABLE "experience_posts_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::text;
  DROP TYPE "public"."enum_experience_posts_blocks_script_copy_btn_code_language";
  CREATE TYPE "public"."enum_experience_posts_blocks_script_copy_btn_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig', 'adoc', 'batch', 'be', '1c', 'cdc', 'clj', 'ql', 'coffeescript', 'lisp', 'c++', 'c#', 'cs', 'cql', 'dockerfile', 'elisp', 'erl', 'ftl', 'f', 'for', 'f77', 'f90', 'f95', 'f03', 'f08', 'f18', 'f#', 'fs', 'gjs', 'gts', 'gql', 'hbs', 'hs', 'properties', 'js', 'fsl', 'jl', 'kt', 'kts', 'kql', 'lean4', 'makefile', 'md', 'mmd', 'mips', 'nar', 'nf', 'nu', 'objc', 'pot', 'potx', 'ps', 'ps1', 'protobuf', 'jade', 'py', 'perl6', 'regex', 'rb', 'rs', '1c-query', 'shader', 'bash', 'sh', 'shell', 'zsh', 'console', 'closure-templates', 'spl', 'styl', 'talon', 'tf', 'tfvars', 'lit', 'ts', 'tsp', 'typ', 'cmd', 'vim', 'vimscript', 'vy', '文言', 'mediawiki', 'wiki', 'wl', 'yml');
  ALTER TABLE "experience_posts_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::"public"."enum_experience_posts_blocks_script_copy_btn_code_language";
  ALTER TABLE "experience_posts_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE "public"."enum_experience_posts_blocks_script_copy_btn_code_language" USING "code_language"::"public"."enum_experience_posts_blocks_script_copy_btn_code_language";
  ALTER TABLE "_experience_posts_v_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE text;
  ALTER TABLE "_experience_posts_v_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::text;
  DROP TYPE "public"."enum__experience_posts_v_blocks_script_copy_btn_code_language";
  CREATE TYPE "public"."enum__experience_posts_v_blocks_script_copy_btn_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig', 'adoc', 'batch', 'be', '1c', 'cdc', 'clj', 'ql', 'coffeescript', 'lisp', 'c++', 'c#', 'cs', 'cql', 'dockerfile', 'elisp', 'erl', 'ftl', 'f', 'for', 'f77', 'f90', 'f95', 'f03', 'f08', 'f18', 'f#', 'fs', 'gjs', 'gts', 'gql', 'hbs', 'hs', 'properties', 'js', 'fsl', 'jl', 'kt', 'kts', 'kql', 'lean4', 'makefile', 'md', 'mmd', 'mips', 'nar', 'nf', 'nu', 'objc', 'pot', 'potx', 'ps', 'ps1', 'protobuf', 'jade', 'py', 'perl6', 'regex', 'rb', 'rs', '1c-query', 'shader', 'bash', 'sh', 'shell', 'zsh', 'console', 'closure-templates', 'spl', 'styl', 'talon', 'tf', 'tfvars', 'lit', 'ts', 'tsp', 'typ', 'cmd', 'vim', 'vimscript', 'vy', '文言', 'mediawiki', 'wiki', 'wl', 'yml');
  ALTER TABLE "_experience_posts_v_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DEFAULT 'shell'::"public"."enum__experience_posts_v_blocks_script_copy_btn_code_language";
  ALTER TABLE "_experience_posts_v_blocks_script_copy_btn" ALTER COLUMN "code_language" SET DATA TYPE "public"."enum__experience_posts_v_blocks_script_copy_btn_code_language" USING "code_language"::"public"."enum__experience_posts_v_blocks_script_copy_btn_code_language";
  ALTER TABLE "me" ALTER COLUMN "description" SET DEFAULT 'I''''m a software engineer';`);
}
