import requests
from bs4 import BeautifulSoup as soup
import webbrowser
import sys

def open(url):
    try:
        webbrowser.open(url)
        sys.exit()
    except Exception as err:
        print(err)
        sys.exit()

def get_html(url):
    res = requests.get(url)
    try:
        res.raise_for_status
    except Exception as err:
        print(err)
        sys.exit()

    res_soup = soup(res.text, 'html.parser')
    print(res_soup)

commands = ['--open','-o','--html']
usage_text = """
    This is a simple python programme that just opens a url in the web browser and gets the html source code from a particular url.

    usage
    =======

    python scrape.py --open <url> or -o <url>

    python scrape.py --html <url>
"""

def init():
    args = sys.argv[1:]

    if len(args) < 2:
        print(usage_text)
        sys.exit()

    if args[0] == '--open' or args[0] == '-o':
        open(args[1])

    if args[0] == '--html':
        get_html(args[1])
    
if __name__ == '__main__':
    init()
