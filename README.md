# ScAIfolding

An experiment on using OpenAI's completion to generate a convenience script that gets a sample file and generates a similar one with some instructions on to what to change.
Hopefully useful to automate boilerplate code like domain model entities, test cases, UI components or anything that sort of has a template
Done as part as [SCVSoft's](http://www.scvsoft.com) OpenAI Hackathon

# Usage

- Download the repo
- copy `.env.example` into `.env` and add your own `OPENAI_ORG` and `OPENAI_KEY` (or just set those as environment variables)
- run `node bin/index.js --help` for reference
