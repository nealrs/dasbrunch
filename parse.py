from readability import ParserClient
import pystache
import sys
import re
from ftfy import fix_text

# readability api key
parser = ParserClient('877f0069c46e0603a7d5868fab7d50731817dd9f')

# thanks to http://jamesmurty.com/2011/12/30/python-code-utf8-to-latin1/
def strip (html):
	html = re.sub(u'[\u02bc\u2018\u2019\u201a\u201b\u2039\u203a\u300c\u300d]',"'",html)
	# Replace "smart" and other double-quote like things
	html = re.sub(u'[\u00ab\u00bb\u201c\u201d\u201e\u201f\u300e\u300f]','"', html)
	# Replace copyright symbol
	html = re.sub(u'[\u00a9\u24b8\u24d2]', '(c)', html)
	# Replace registered trademark symbol
	html = re.sub(u'[\u00ae\u24c7]', '(r)', html)
	# Replace sound recording copyright symbol
	html = re.sub(u'[\u2117\u24c5\u24df]', '(p)', html)
	# Replace service mark symbol
	html = re.sub(u'[\u2120]', '(sm)', html)
	# Replace trademark symbol
	html = re.sub(u'[\u2122]', '(tm)', html)
	# Replace em & em dashes
	html = re.sub(u'[\u2013]', '&ndash;', html)
	html = re.sub(u'[\u2014]', '&mdash;', html)
	# weird hyphen replace
	html = re.sub(u'[\xad]', '&shy;', html)
	# Replace/clobber any remaining UTF-8 characters that aren't in ISO-8859-1
	return fix_text(html)
	#return (html)

i=0 # counter for loop
for u in sys.argv:

	if (i==0):
		i=i+1
		pass
	else:
		print "processing URL :" + u

		# get parse article
		p = parser.get_article_content(u)

		#calc reading time (assumine 200 wpm)
		time = len(re.findall(r'\w+', p.content['content']))/250

		# process template
		template = unicode(open("template.html","r").read())
		html = pystache.render(template,{ 'url':p.content['url'], 'title':p.content['title'], 'author':p.content['author'], 'publisher': p.content['domain'], 'content':p.content['content'], 'time':time, 'order':i })

		print "HTML output: " + html

		# write out HTML - but remember, need to check for missing data like usually author name
		f = open(str(i)+'.html', 'w')

		html = strip(html)

		f.write(html)
		f.close()
		i=i+1
