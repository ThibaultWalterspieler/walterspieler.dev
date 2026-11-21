# How we work with agents

A map for humans: which skill to reach for at which step. Skills marked _(you)_ only run when you type them; the others the agent also reaches for on its own.

Most skills come from the [`mattpocock-skills`](https://github.com/mattpocock/skills) plugin, enabled for this repo in `.claude/settings.json`. `/ask-matt` _(you)_ routes you when this page doesn't.

## The main flow: idea to merged PR

| Step                              | Skill                                 | What you get                                                                                                                          |
| --------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Align                          | `/grill-with-docs` _(you)_            | The agent interviews you until the idea is sharp, and writes new terms to `GLOSSARY.md` and hard-to-reverse decisions to `docs/adr/`. |
| 2. Settle a design question       | `/prototype`                          | Throwaway code that answers one question: a data shape, or several layouts of a page to compare.                                      |
| 3. Plan (multi-session work only) | `/to-spec` then `/to-tickets` _(you)_ | A spec issue on GitHub, split into small tickets with their blocking order.                                                           |
| 4. Build                          | `/implement` _(you)_                  | The change, built test-first where there is logic to test, and reviewed before the commit.                                            |
| 5. Prove                          | `verify-walterspieler-dev`            | Evidence from the running app: what was driven, what was observed.                                                                    |
| 6. Review                         | `/mattpocock-skills:code-review`      | Two separate reports: against `CODING_STANDARDS.md`, and against the spec.                                                            |
| 7. Ship                           | `/pr`                                 | A PR body with the change, the evidence, and how risky the merge is.                                                                  |
| 8. Learn                          | `/retro` _(you)_                      | Suggested fixes to the agent's environment: a lint rule, a pointer, a standard.                                                       |

Small change, one session: steps 1, 4, 5, 7.

Type the review step in full, `/mattpocock-skills:code-review`: Claude Code also ships a built-in `/code-review`, which hunts bugs and does not review against `CODING_STANDARDS.md` and the spec.

## Side roads

- **Something is broken and resists a first look**: `/diagnosing-bugs`. It builds a command that fails on the bug before theorising.
- **A big diff, or a file that keeps growing**: `/thermo-nuclear-code-quality-review` _(you)_. A deliberately harsh structural review; use it before merging anything large, not on every PR.
- **Incoming bug reports and requests**: `/triage` _(you)_. Labels are in `triage-labels.md`.
- **Spare half hour**: `/improve-codebase-architecture` _(you)_ surveys the code for modules worth simplifying.
- **A question that needs reading, not coding** (a Payload or Next.js behaviour, say): `/research` runs in the background and leaves a cited file.
- **The agent said something you didn't follow**: `/wait-what` _(you)_.

## Habits that make the flow work

- **Grill before building.** Misalignment is the most common failure; ten minutes of questions is cheaper than a wrong PR.
- **Use the glossary's words** in prompts, issues and code. Shared words make the agent shorter and more accurate.
- **Keep one phase per context.** Grill, spec and tickets in one session; then a fresh session per ticket.
- **A mistake made twice becomes a check.** Mechanical mistakes get a lint rule or CI step; judgement calls get a line in `CODING_STANDARDS.md`. `AGENTS.md` stays a short list of pointers.
- **A proof, not a claim.** A change to anything visible is done when `verify-walterspieler-dev` shows it working.

## Where each kind of knowledge lives

| File                  | Read by                    | Holds                                                          |
| --------------------- | -------------------------- | -------------------------------------------------------------- |
| `AGENTS.md`           | every agent, every turn    | Pointers and the few rules that apply to all work. Kept short. |
| `GLOSSARY.md`         | agents before exploring    | The project's words.                                           |
| `docs/adr/`           | agents working in the area | Hard-to-reverse decisions and why. Created with the first one. |
| `CODING_STANDARDS.md` | the reviewer               | Judgement calls tooling cannot enforce.                        |
| `README.md`           | humans and agents          | Setup and schema commands. Local database: the verify skill.   |
| `.claude/skills/`     | agents, on demand          | Repo-specific procedures: verifying, harsh review.             |
| `docs/agents/`        | the skills                 | Tracker, labels, domain-doc layout, and this map.              |

## Where this setup comes from

- [Matt Pocock's skills](https://github.com/mattpocock/skills): the main flow, the glossary, the short `AGENTS.md`, standards read at review time.
- [poteto's verification-skill example](https://github.com/poteto/verification-skill-example) (Lauren Tan): the shape of `verify-walterspieler-dev`, a launch-and-prove skill with a feature map.
- [Cursor's thermos plugin](https://github.com/cursor/plugins/tree/main/thermos): the thermo-nuclear code quality review, vendored as is with its MIT licence.
