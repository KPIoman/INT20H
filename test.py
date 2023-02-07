from jinja2 import Template

def calcName(n, i):
    return ' '.join([n] * i)

template = Template("Hello {{ calcName('Gandalf', 2) }}")

template.render(calcName=calcName)
