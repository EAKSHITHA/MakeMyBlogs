select serverproperty('IsFullTextInstalled')

ALTER FULLTEXT INDEX ON Blog
SET STOPLIST HtmlTags

--CONTAINS
select * from dbo.Blog where contains(Title, 'etc')

select * from dbo.Blog where contains(Title, 'header AND NOT nbsp')

select * from dbo.Blog where contains(PostContent, '"world. As medicine"')

--searches for the close proximity of the two words. Useful when html comes in between the words 
select * from dbo.Blog where contains(PostContent, 'near(steps, trees)')

--searches for all forms of a word- wash, washed, washing, washes etc
select * from dbo.Blog where contains(PostContent, 'formsof(INFLECTIONAL, washing)')

--FREETEXT : Fuzzy search

--by default searches for all forms of inflectional results
select * from dbo.Blog where freetext(PostContent, 'washing')

--by default searches for proximity words
select * from dbo.Blog where freetext(Title, 'hea header')

--FREETEXTTABLE : get best matched results

select * from freetexttable(dbo.Blog, (Title, PostContent, Summary), 'hea header tree life') as t
join dbo.Blog b on t.[key] = b.Id
order by t.[rank] desc

select top 3 * from freetexttable(dbo.Blog, Title, 'hea header') as t
join dbo.Blog b on t.[key] = b.Id
order by t.[rank] desc

select * from dbo.Blog where Title like '%strong%'

create proc spSearchAllByFtt
@Keyword varchar(500)
as
	BEGIN
		select * from freetexttable(dbo.Blog, (Title, PostContent, Summary), @Keyword) as t
		join dbo.Blog b on t.[key] = b.Id
		order by t.[rank] desc
	END
 
execute spSearchAllByFtt 'hea tree life'